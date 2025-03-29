module grant_compiler::project;

use std::string::{Self, String};
use sui::clock::Clock;
use sui::object::{Self, ID, UID};
use sui::tx_context::{Self, TxContext};
use sui::balance::{Self, Balance};
use sui::url::{Self, Url};

// To be a single owner object
public struct Project has key, store {
    id: UID,
    title: String,
    description: String,
    hackathon_id: ID,
    links: vector<Url>,
    owner: address,
    created_at: u64,
}

public fun new(
    hackathon: &mut grant_compiler::hackathon::Hackathon,
    title: String,
    description: String,
    links: vector<Url>,
    clock: &Clock,
    ctx: &mut TxContext,
): Project {
    let project = Project {
        id: object::new(ctx),
        title,
        description,
        links,
        hackathon_id: object::id(hackathon),
        owner: tx_context::sender(ctx),
        created_at: clock.timestamp_ms(),
    };

    hackathon.add_project_id(object::id(&project), clock);
    project
}

/// Update fields (only by owner)
public fun update(
    self: &mut Project,
    new_title: String,
    new_description: String,
    ctx: &TxContext,
) {
    assert!(self.owner == ctx.sender(), 0);
    self.title = new_title;
    self.description = new_description;
}

public fun claim_grant(
    self: &Project,
    hackathon: &mut grant_compiler::hackathon::Hackathon,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    let grant = hackathon.split_project_grant(object::id(self), clock);
    let coin = sui::coin::from_balance(grant, ctx);
    sui::transfer::public_transfer(coin, self.owner);
}

// public fun delete(self: Project) {
//     let Project { id, .. } = self;
//     object::delete(id);
// }
