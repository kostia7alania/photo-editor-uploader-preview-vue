
const getters = {
  /*anychanges: s=> {   // return diff(s.copyObj,s.newJson)
    return JSON.stringify(s.copyObj) != JSON.stringify(s.newJson) ///1-если есть изменения
  },*/
  deficiencies_index: s => {
    let index;
    s.deficiencies.some(
      (el, i) =>
        el.def == s.def_uid && el.insp == s.insp_uid && (index = i)
    );
    return index;

  },

}


export default getters;