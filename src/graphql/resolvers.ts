import {gql} from '@apollo/client';

export const typeDefs = gql`
        extend type Mutation {
            ToggleCartHidden: Boolean!
        }
    `;

export const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

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
        }
    }
}