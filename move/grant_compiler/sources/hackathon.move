module grant_compiler::hackathon {
    use std::string::{Self, String};

    use sui::clock::{Clock};
    use sui::object::{Self, ID, UID};

    public struct Hackathon has key, store {
        id: UID,
        title: String,
        description: String,
        deadline: u64,
        projects: vector<ID>,
        created_by: address,
        created_at: u64,
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
            projects: vector[],
            created_by: tx_context::sender(ctx),
            created_at: timestamp,
        };
        sui::transfer::public_share_object(hackathon);
    }

    public fun add_project_id(hackathon: &mut Hackathon, project_id: ID) {
        hackathon.projects.push_back(project_id);
    }
}
