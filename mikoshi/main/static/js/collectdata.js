function collectSkills() {
    const skillsMap = {};
  
    document.querySelectorAll('.level').forEach(input => {
      const skill = input.dataset.skill;
      if (!skillsMap[skill]) skillsMap[skill] = {};
      skillsMap[skill].level = parseInt(input.value || 0, 10);
    });
  
    document.querySelectorAll('.mod').forEach(input => {
      const skill = input.dataset.skill;
      if (!skillsMap[skill]) skillsMap[skill] = {};
      skillsMap[skill].mod = parseInt(input.value || 0, 10);
    });
  
    return skillsMap;
  }
  
function collectStats() {
    const statMap = {};
        document.querySelectorAll('.stat').forEach(input => {
        const key = input.dataset.stat; // "int", "ref" и т.д.
        statMap[key] = parseInt(input.value || "0", 10);
    });
    return statMap;
}
  
function collectArmor() {
    const armorMap = {};
        document.querySelectorAll('.armor').forEach(input => {
        const key = input.dataset.armor; // "head", "body", "shield"
        armorMap[key] = parseInt(input.value || "0", 10);
    });
    return armorMap;
}