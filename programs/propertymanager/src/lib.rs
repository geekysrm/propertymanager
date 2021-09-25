use std::collections::HashMap;
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod propertymanager {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct BaseAccount {
    pub user_map: HashMap<String, User> // address -> User
    pub property_map: HashMap<String, Property> // id -> Property
    pub buy_order_map: HashMap<String, BuyOrder> // order_id -> BuyOrder
}

pub struct User {
    pub address: String, // wallet address of each user (set while registering)
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub property_list: Vec<Property>,
    pub buy_orders: Vec<BuyOrder>,
}

pub struct Property {
    pub id: String, // as no admin, we will create some properties with random id generator
    pub name: String,
    pub address: String, // residential address
    pub lat: String,
    pub long: String,
    pub zip_code: String,
    pub current_owner: Owner,
    pub past_owner_list: Vec<Owner>,
}

pub struct Owner {
    pub user_address: String, // wallet address of owner
    pub start_time: String,
    pub end_time: String,
}

pub struct BuyOrder {
    pub order_id: String, // id for each order
    pub buyer_address: String, // wallet address of buyer
    pub current_owner_address: String, // wallet address of current owner
    pub property_id: String, 
    pub status: String,
}

/*
1. Registration of new user
    - Create a new User object with details & empty property list
    - Add to user_map

2. For Transfer ownership - 
    - Check if property id is present in property_list of old owner
    - Push current_owner to past_owner_list with timestamps
    - Update current_owner to new owner
    - Remove property from property_list of old owner
    - Add property to property_list of new owner

3. For creating Buy Order - 
    - Will create a BuyOrder object with property_id, user wallet address & property owner address
    - Will have a random order id
    - Add to buy_order_map
    - Add to property owners buy_orders

4. Approve Buy Order - 
    - Same as Transfer ownership
    - With parameters taken from Buy order object
    - Update Status in BuyOrder

5. Reject Buy Order - 
    - Update Status in BuyOrder
*/