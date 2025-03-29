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
        scoreboard: ScoreBoard,
        pool: ReviewerPool,
        deadline: u64,
        created_by: address,
        created_at: u64,
    }

    public struct ScoreBoard has store {
        projects: vector<ID>,
        scores: Table<ID, u64>,
        sum_score: u64,
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
            scoreboard: ScoreBoard {
                projects: vector[],
                scores: table::new<ID, u64>(ctx),
                sum_score: 0,
            },
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
        self.scoreboard.projects.push_back(project_id);
        self.scoreboard.scores.add(project_id, 0);
    }

    public fun update_score(self: &mut Hackathon, project_id: ID, score: u64) {
        self.scoreboard.scores.add(project_id, score);
        self.scoreboard.sum_score = self.scoreboard.sum_score + score;
    }

    public fun calulate_project_reward_value(self: &Hackathon, project_id: ID): u64 {
        let total_score = self.scoreboard.sum_score;
        let project_score = *self.scoreboard.scores.borrow(project_id);
        let project_reward_value = total_score * project_score / total_score;
        project_reward_value
    }

    public fun split_project_reward(self: &mut Hackathon, project_id: ID): Balance<sui::sui::SUI> {
        let project_reward_value = self.calulate_project_reward_value(project_id);
        let project_reward = self.pool.reserved_sui.split(project_reward_value);
        project_reward
    }

    public fun withdraw_remaining_reward(self: &mut Hackathon, ctx: &mut tx_context::TxContext) {
        let total_score = self.scoreboard.sum_score;
        assert!(total_score > 0, 0);

        let total_value = self.pool.reserved_sui.value();
        let project_count = self.scoreboard.projects.length();
        let mut i = 0;
        let mut remaining = total_value;
        while (i < project_count) {
            remaining = remaining - self.calulate_project_reward_value(*self.scoreboard.projects.borrow(i));
            i = i + 1;
        };

        let remaining_reward = self.pool.reserved_sui.split(remaining);
        let coin = sui::coin::from_balance(remaining_reward, ctx);
        transfer::public_transfer(coin, self.created_by);
    }
}
