import {gql} from '@apollo/client';
import {PayloadAction} from "@reduxjs/toolkit";
import { ChangeQuantityType } from '../redux/cart/cart.reducer';

const addItemToCart = (cartItems: any, cartItemToAdd: any) => {
    const existingCartItem = cartItems.find((cartItem: any) => cartItem.id === cartItemToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem: any) =>
            cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
        );
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
const changeQuantity = (cartItems: any, payload: ChangeQuantityType) => {
    const index = cartItems.findIndex((item: any) => item.id === payload.id);
    if (payload.direction === 'dec') {
        if (cartItems[index].quantity > 1) {
            return cartItems.map((i: any) => i.id === payload.id ? {...i, quantity: i.quantity - 1} : i);
        }
    }
    if (payload.direction === 'inc') {
        return cartItems.map((i: any) => i.id === payload.id ? {...i, quantity: i.quantity + 1} : i);
    }
};
const removeItem = (cartItems: any, id: number) => {
    return cartItems.filter((i: any) => i.id !== id);
};

export const typeDefs = gql`
        extend type Item {
            quantity: Int
        }
        type Payload {
            direction: String
            id: Int
        }
        extend type Mutation {
            ToggleCartHidden: Boolean!
            AddItemToCartGraphql(item: Item!): [Item]!
            ChangeQuantityGraphql(payload: Payload!): [Item]!
            RemoveItemFromCart(id: Int): [Item]!
        }
    `;

export const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;
export const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const getCartItems = (cache: any) => {
    const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
    });
    return cartItems;
};
const rewriteCartItems = (cache: any, arr: any) => {
    cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: arr },
    });
};

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root: any, _args: any, _context: any, _info: any) => {
            const { cartHidden } = _context.cache.readQuery({
                query: GET_CART_HIDDEN,
                //variables: {}
            });
            _context.cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden },
            });
            return !cartHidden;
        },
        AddItemToCartGraphql: (_root: any, {item}: any, {cache}: any) => {
            const cartItems = getCartItems(cache);
            const newCartItems = addItemToCart(cartItems, item);
            rewriteCartItems(cache, newCartItems);
            return newCartItems;
        },
        ChangeQuantityGraphql: (_root: any, {payload}: any, {cache}: any) => {
            const cartItems = getCartItems(cache);
            const newCartItems = changeQuantity(cartItems, payload);
            rewriteCartItems(cache, newCartItems);
            return newCartItems;
        },
        RemoveItemFromCart: (_root: any, {id}: any, {cache}: any) => {
            const cartItems = getCartItems(cache);
            const newCartItems = removeItem(cartItems, id);
            rewriteCartItems(cache, newCartItems);
            return newCartItems;
        }
    }
}

