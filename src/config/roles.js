const roles = [1, 2, 3];

const roleRights = new Map();
roleRights.set(roles[0], ['getMember']);
roleRights.set(roles[1], ['getMember']);
roleRights.set(roles[2], ['getMember']);

module.exports = {
  roles,
  roleRights,
};
