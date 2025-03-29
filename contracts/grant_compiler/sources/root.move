module grant_compiler::root;

use std::string::{Self, String};
use sui::clock::Clock;
use sui::object::{Self, ID, UID};
use sui::tx_context::{Self, TxContext};
use sui::balance::{Self, Balance};
use sui::url::{Self, Url};
use sui::transfer;

// To be a shared object
public struct Root has key, store {
    id: UID,
    hackathons: vector<ID>,
}


fun init(ctx: &mut TxContext) {
    let root = Root {
        id: object::new(ctx),
        hackathons: vector[],
    };
    transfer::public_share_object(root);
}

public fun add_hackathon(root: &mut Root, hackathon_id: ID) {
    root.hackathons.push_back(hackathon_id);
}
