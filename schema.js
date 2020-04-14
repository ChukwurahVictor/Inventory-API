const graphql = require('graphql')

//import Item model
const item = require('./models/Items')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql

//define datatypes
const ItemType = new GraphQLObjectType({
    name: 'Items',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        unitPrice: {
            type: GraphQLString
        },
        bulkPrice: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        item: {
            type: ItemType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return item.findById(args.id);
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return item.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addItem: {
            type: ItemType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                unitPrice: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                bulkPrice: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                category: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let item = new Item({
                    name: args.name,
                    unitPrice: args.unitPrice,
                    bulkPrice: args.bulkPrice,
                    category: args.category
                })
                return item.save();
            }
        }
    }
})

//export module
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})