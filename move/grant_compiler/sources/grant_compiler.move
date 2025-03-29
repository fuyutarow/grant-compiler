module grant_compiler::core {
    use std::string::{Self, String};

    use sui::clock::{Clock};
    use sui::object::{Self, ID, UID};

    /// Hackathon struct (Event definition)
    public struct Hackathon has key, store {
        id: UID,
        title: String,
        description: String,
        deadline: u64,
        reward_vault_id: ID,
        created_by: address,
        created_at: u64,
    }

    /// Project struct (Participant's submission)
    public struct Project has key, store {
        id: UID,
        title: String,
        description: String,
        walrus_ref: String,
        hackathon_id: ID,
        owner: address,
        created_at: u64,
    }

    /// RewardVault struct (Reward management)
    public struct RewardVault has key, store {
        id: UID,
        hackathon_id: ID,
        total_fund: u64,
        distributed: bool,
        created_at: u64,
    }


    /// Create new Hackathon and RewardVault
    public fun create_hackathon(
        title: String,
        description: String,
        deadline: u64,
        clock: &Clock,
        ctx: &mut tx_context::TxContext,
    ): (Hackathon, RewardVault) {
        let vault_id = object::new(ctx);
        let timestamp = clock.timestamp_ms();

        let hackathon = Hackathon {
            id: object::new(ctx),
            title,
            description,
            deadline,
            reward_vault_id: object::uid_to_inner(&vault_id),
            created_by: ctx.sender(),
            created_at: timestamp,
        };

        let vault = RewardVault {
            id: vault_id,
            hackathon_id: object::id(&hackathon),
            total_fund: 0,
            distributed: false,
            created_at: timestamp,
        };

        return (hackathon, vault)
    }

    public fun submit_project(
        hackathon_id: ID,
        title: String,
        description: String,
        walrus_ref: String,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Project {
        Project {
            id: object::new(ctx),
            title,
            description,
            walrus_ref,
            hackathon_id,
            owner: ctx.sender(),
            created_at: clock.timestamp_ms(),
        }
    }
}
