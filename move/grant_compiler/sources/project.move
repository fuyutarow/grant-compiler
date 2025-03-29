
module grant_compiler::project {
    use std::string::{Self, String};
    use sui::clock::Clock;
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};

    /// Project struct
    public struct Project has key, store {
        id: UID,
        title: String,
        description: String,
        walrus_ref: String,
        hackathon_id: ID,
        owner: address,
        created_at: u64,
    }

    public fun new(
        hackathon: &mut grant_compiler::hackathon::Hackathon,
        title: String,
        description: String,
        walrus_ref: String,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Project {
        let project = Project {
            id: object::new(ctx),
            title,
            description,
            walrus_ref,
            hackathon_id: object::id(hackathon),
            owner: tx_context::sender(ctx),
            created_at: clock.timestamp_ms(),
        };

        hackathon.add_project_id(object::id(&project));
        project
    }


    /// Update fields (only by owner)
    public fun update(
        project: &mut Project,
        new_title: String,
        new_description: String,
        new_walrus_ref: String,
        ctx: &TxContext,
    ) {
        assert!(project.owner == ctx.sender(), 0);
        project.title = new_title;
        project.description = new_description;
        project.walrus_ref = new_walrus_ref;
    }

    public fun delete(project: Project) {
        let Project { id, .. } = project;
        object::delete(id);
    }
}
