use anchor_lang::prelude::*;

declare_id!("Hm9fwKgoNVWK1GuzmNh7j78GX3Yzd2H2vCvbyiJ8mcbS");

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

        base_account.user_list.push(user);

        Ok(())
    }

    pub fn addproperty(ctx: Context<AddProperty>, id: String, name: String, 
        address: String, dimensions: String, zip_code: String, lat: String, lng: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let authority_address = base_account.authority.to_string();
        
        let property = Property {
            id: id.clone(),
            name,
            address,
            dimensions,
            zip_code,
            lat,
            lng,
            current_owner: base_account.authority.to_string(),
            past_owner_list: Vec::new(),
        };

        base_account.property_list.push(property);
        
        let user_index: usize = base_account.user_list.iter().position(|u| *u.address == authority_address).unwrap().clone();
        let user = &mut base_account.user_list[user_index];
        user.property_list.push(id.clone());

        Ok(())
    }

    pub fn transfer(ctx: Context<Transfer>, current_owner: String, next_owner: String, 
        property_id: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let property_index: usize = base_account.property_list.iter().position(|p| *p.id == property_id).unwrap().clone();
        let property = &mut base_account.property_list[property_index];
        property.past_owner_list.push(current_owner.clone());
        property.current_owner = next_owner.clone();

        let current_owner_index: usize = base_account.user_list.iter().position(|u| *u.address == current_owner).unwrap().clone();
        let current_user = &mut base_account.user_list[current_owner_index];
        current_user.property_list.retain(|x| *x != property_id);

        let next_owner_index: usize = base_account.user_list.iter().position(|u| *u.address == next_owner).unwrap().clone();
        let next_user = &mut base_account.user_list[next_owner_index];
        next_user.property_list.push(property_id);

        Ok(())
    }

    pub fn createbuyorder(ctx: Context<CreateBuyOrder>, order_id: String, buyer_address: String, 
        current_owner_address: String, property_id: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let buy_order = BuyOrder {
            order_id: order_id.clone(),
            buyer_address: buyer_address.clone(),
            current_owner_address: current_owner_address.clone(),
            property_id: property_id.clone(),
            status: String::from("REQUESTED"),
        };

        base_account.buy_order_list.push(buy_order);

        let current_owner_index: usize = base_account.user_list.iter().position(|u| *u.address == current_owner_address).unwrap().clone();
        let current_user = &mut base_account.user_list[current_owner_index];
        current_user.buy_orders.push(order_id);

        Ok(())
    }

    pub fn approve(ctx: Context<Approve>, order_id: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let buy_order_index: usize = base_account.buy_order_list.iter().position(|o| *o.order_id == order_id).unwrap().clone();
        let buy_order = &mut base_account.buy_order_list[buy_order_index];
        buy_order.status = String::from("APPROVED");

        let current_owner = buy_order.clone().current_owner_address;
        let next_owner = buy_order.clone().buyer_address;
        let property_id = buy_order.clone().property_id;

        let property_index: usize = base_account.property_list.iter().position(|p| *p.id == property_id).unwrap().clone();
        let property = &mut base_account.property_list[property_index];
        property.past_owner_list.push(current_owner.clone());
        property.current_owner = next_owner.clone();

        let current_owner_index: usize = base_account.user_list.iter().position(|u| *u.address == current_owner).unwrap().clone();
        let current_user = &mut base_account.user_list[current_owner_index];
        current_user.property_list.retain(|x| *x != property_id);

        let next_owner_index: usize = base_account.user_list.iter().position(|u| *u.address == next_owner).unwrap().clone();
        let next_user = &mut base_account.user_list[next_owner_index];
        next_user.property_list.push(property_id);

        Ok(())
    }

    pub fn reject(ctx: Context<Reject>, order_id: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let buy_order_index: usize = base_account.buy_order_list.iter().position(|o| *o.order_id == order_id).unwrap().clone();
        let buy_order = &mut base_account.buy_order_list[buy_order_index];
        buy_order.status = String::from("REJECTED");

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

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[derive(Accounts)]
pub struct CreateBuyOrder<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[derive(Accounts)]
pub struct Approve<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[derive(Accounts)]
pub struct Reject<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub user_list: Vec<User>,
    pub property_list: Vec<Property>,
    pub buy_order_list: Vec<BuyOrder>,
    pub authority: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Debug)]
pub struct User {
    pub address: String, // wallet address of each user (set while registering)
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub property_list: Vec<String>,
    pub buy_orders: Vec<String>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Debug)]
pub struct Property {
    pub id: String, // as no admin, we will create some properties with random id generator
    pub name: String,
    pub address: String, // residential address
    pub dimensions: String,
    pub zip_code: String,
    pub lat: String,
    pub lng: String,
    pub current_owner: String,
    pub past_owner_list: Vec<String>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Debug)]
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
    - Check if property id is present in property_list of old owner [X]
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