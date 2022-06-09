const userTransformer = (user) => {
    delete user['dataValues']['password']
    delete user['dataValues']['roleId']
    delete user['dataValues']['deletedAt']
    delete user['dataValues']['isActive']
    delete user['dataValues']['createdAt']
    delete user['dataValues']['updatedAt']
    return user
}

module.exports = {
    userTransformer
}