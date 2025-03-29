#[test_only]
module grant_compiler::test_hackathon_integration;

use std::string::{utf8};
use sui::test_scenario::{Self as test, ctx};
use sui::clock::{Self, Clock};
use sui::object::{Self, ID};
use grant_compiler::hackathon::{Hackathon, AdminCap};
use grant_compiler::project::Project;

const ALICE: address = @0xA11CE;
const BOB: address = @0xB0B;
const REWARD_SUI_SUPPLY: u64 = 1000 * 1_000_000_000;

#[test]
fun test_hackathon_flow() {
    let mut scenario = test::begin(@0x1);
    let test = &mut scenario;

    // Create and share Clock
    clock::create_for_testing(test.ctx()).share_for_testing();

    // === Step 1: ALICE creates Hackathon ===
    test.next_tx(ALICE); {
        let clock = test.take_shared<Clock>();
        let cap = grant_compiler::hackathon::create(
            utf8(b"My Hackathon"),
            utf8(b"A fun event"),
            999999999999,
            &clock,
            test.ctx()
        );
        test::return_shared(clock);
        sui::transfer::public_transfer(cap, ALICE);
    };

    // === Step 2: ALICE stakes SUI ===
    test.next_tx(ALICE); {
        let clock = test.take_shared<Clock>();
        let mut hackathon = test.take_shared<Hackathon>();
        let coin = sui::coin::mint_for_testing<sui::sui::SUI>(REWARD_SUI_SUPPLY, test.ctx());
        let balance = sui::coin::into_balance(coin);
        hackathon.stake_sui(balance, &clock);
        test::return_shared(clock);
        test::return_shared(hackathon);
    };

    // === Step 3: BOB submits Project ===
    test.next_tx(BOB); {
        let clock = test.take_shared<Clock>();
        let mut hackathon = test.take_shared<Hackathon>();
        let project = grant_compiler::project::new(
            &mut hackathon,
            utf8(b"My Project"),
            utf8(b"Cool stuff"),
            utf8(b"walrus://ref"),
            &clock,
            test.ctx()
        );
        sui::transfer::public_transfer(project, BOB);
        test::return_shared(hackathon);
        test::return_shared(clock);
    };

    // === Step 4: ALICE updates score ===
    test.next_tx(ALICE); {
        let clock = test.take_shared<Clock>();
        let mut hackathon = test.take_shared<Hackathon>();
        let cap = test.take_from_address<AdminCap>(ALICE);
        let project = test.take_from_address<Project>(BOB);
        let project_id = object::id(&project);
        hackathon.update_score(&cap, project_id, 100, &clock);
        test::return_shared(clock);
        test::return_shared(hackathon);
        test::return_to_address(ALICE, cap);
        test::return_to_address(BOB, project);
    };

    // === Step 5: BOB claims reward ===
    test.next_tx(BOB); {
        let clock = test.take_shared<Clock>();
        let mut hackathon = test.take_shared<Hackathon>();
        let mut project = test.take_from_address<Project>(BOB);
        project.claim_reward(&mut hackathon, &clock, test.ctx());
        test::return_to_address(BOB, project);
        test::return_shared(hackathon);
        test::return_shared(clock);
    };

    test::end(scenario);
}
