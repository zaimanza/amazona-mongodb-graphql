const User = require("../../../models/user")

exports.getAdminAllUserSchema = `

extend type Query {
    getAdminAllUser: [userRes!]
}
`;

exports.getAdminAllUserController = {
    Query: {
        getAdminAllUser: async (root, {
        }, {
            req,
            errorName
        }) => {
            try {
                if (!req._id || !req.isAdmin) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const users = await User.find()
                return users.map(user => {
                    return {
                        ...user._doc,
                        _id: user.id,
                    }
                })

            } catch (err) {
                throw err;
            }
        },
    },
};