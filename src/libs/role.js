const roles = {
  werewolf: {
    type: 'werewolf'
  },
  seer: {
    type: 'seer'
  },
  hunter: {
    type: 'hunter',
    canUsePower: true
  },
  witch: {
    type: 'witch',
    canUsePotion: true,
    canUsePoison: true
  },
  villager: {
    type: 'villager'
  }
}

export default roles;