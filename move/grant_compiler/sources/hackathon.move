module grant_compiler::hackathon {
    use std::string::{Self, String};

    use sui::clock::{Clock};
    use sui::object::{Self, ID, UID};
    use sui::table::{Self, Table};
    use sui::balance::{Self, Balance};

    public struct Hackathon has key, store {
        id: UID,
        title: String,
        description: String,
        project_scores: Table<ID, u8>,
        pool: ReviewerPool,
        deadline: u64,
        created_by: address,
        created_at: u64,
    }

    public struct ReviewerPool has store {
        reserved_sui: Balance<sui::sui::SUI>,

    }

    public fun create(
        title: String,
        description: String,
        deadline: u64,
        clock: &Clock,
        ctx: &mut tx_context::TxContext,
    ) {
        let timestamp = clock.timestamp_ms();

        let hackathon = Hackathon {
            id: object::new(ctx),
            title,
            description,
            deadline,
            project_scores: table::new<ID, u8>(ctx),
            pool: ReviewerPool {
                reserved_sui: balance::zero(),
            },
            created_by: tx_context::sender(ctx),
            created_at: timestamp,
        };
        sui::transfer::public_share_object(hackathon);
    }

    public fun stake_sui(self: &mut Hackathon, amount: Balance<sui::sui::SUI>) {
        self.pool.reserved_sui.join(amount);
    }

    public fun add_project_id(self: &mut Hackathon, project_id: ID) {
        self.project_scores.add(project_id, 0);
    }
}
