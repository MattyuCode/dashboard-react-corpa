const USERS = localStorage.getItem("USERS");
const noCia = localStorage.getItem("NO_CIA");
 

const url =
  "https://apiproyectosdesarrollo.corpacam.com.gt/api/GetMenus/GetMenu/";
  const datos = `${noCia}/${USERS}/CPR`;

export const API = async (token) => {
  try {
    const response = await fetch(url + datos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const groups = {};
    const pathMenus = {};

    data.forEach((items) => {
      // console.log(items);
      if (!groups[items.DESCRIP_MENU]) {
        groups[items.DESCRIP_MENU] = [];
      }
      // groups[items.DESCRIP_MENU].push(items.DESCRIP_MENU);
      groups[items.DESCRIP_MENU].push(items.DESCRIP_SUBMENU);
      pathMenus[items.DESCRIP_SUBMENU] = items.NOMBRE_SUBMENU;
    });

    for (const group in groups) {
      // console.log(group);
      // console.log(groups[group]);
      groups[group].forEach((submenu) => {
       console.log(submenu);
      });
    }
    // const items = Object.keys(groups).map((key) => ({
    //   title: key,
    //   items: groups[key],
    // }));

    //console.log(items)
    // console.log(pathMenus)
    return { groups, pathMenus };
    //return groups;
    // setMenuItems(Object.keys(groups));
    // setMenuItems(items);
  } catch (error) {
    console.error(error);
  }
};
