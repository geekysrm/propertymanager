use std::collections::HashMap;
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod propertymanager {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, authority: Pubkey) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.authority = authority;

        Ok(())
    }

    pub fn register(ctx: Context<Register>, address: String, 
        name: String, email: String, phone_number: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let user = User {
            address,
            name,
            email,
            phone_number,
            property_list: Vec::new(),
            buy_orders: Vec::new(),
        };

        base_account.user_map.insert(address, user);

        Ok(())
    }

    pub fn addproperty(ctx: Context<AddProperty>, id: String, name: String, 
        address: String, dimensions: String, zip_code: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        
        let mut property = Property {
            id,
            name,
            address,
            dimensions,
            zip_code,
            current_owner: base_account.authority.to_string(),
            past_owner_list: Vec::new(),
        };
        property.past_owner_list.push(base_account.authority.to_string());

        base_account.property_map.insert(id, property);

        let user = &mut base_account.user_map.get(&base_account.authority.to_string());
        user.property_list.push(id);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 2048 + 2048)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Register<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[derive(Accounts)]
pub struct AddProperty<'info> {
    #[account(mut, has_one = authority)]
    pub base_account: Account<'info, BaseAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct BaseAccount {
    pub user_map: HashMap<String, User>, // address -> User
    pub property_map: HashMap<String, Property>, // id -> Property
    pub buy_order_map: HashMap<String, BuyOrder>, // order_id -> BuyOrder
    pub authority: Pubkey,
}

pub struct User {
    pub address: String, // wallet address of each user (set while registering)
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub property_list: Vec<String>,
    pub buy_orders: Vec<String>,
}

pub struct Property {
    pub id: String, // as no admin, we will create some properties with random id generator
    pub name: String,
    pub address: String, // residential address
    pub dimensions: String,
    pub zip_code: String,
    pub current_owner: String,
    pub past_owner_list: Vec<String>,
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

6. Add property - 
    - Check for authority
    - Create a property object
    - Add it to authority's user object
*/