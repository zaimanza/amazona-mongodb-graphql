const User = require("../../../models/user")

exports.getAdminUserByIdSchema = `

extend type Query {
    getAdminUserById(
        id: String!
    ): userRes!
}
`;

exports.getAdminUserByIdController = {
    Query: {
        getAdminUserById: async (root, {
            id,
        }, {
            req,
            errorName
        }) => {
            try {
                if (!req._id || !req.isAdmin) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const user = await User.findOne({ _id: id, })
                return {
                    ...user._doc,
                    _id: user.id,
                }

            } catch (err) {
                throw err;
            }
        },
    },
};