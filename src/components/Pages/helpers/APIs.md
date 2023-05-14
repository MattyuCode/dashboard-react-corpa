//  const token = localStorage.getItem("accessToken");

const url =
  "https://apiproyectosdesarrollo.corpacam.com.gt/api/GetMenus/GetMenu/";

export const API = async (token) => {
  const datos = "10/ADMINISTRADOR/CPR";
  try {
    const response = await fetch(url + datos, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    const groups = {};
    data.forEach((items) => {
      // console.log(items);
      if (!groups[items.DESCRIP_MENU]) {
        groups[items.DESCRIP_MENU] = [];
      }
      // groups[items.DESCRIP_MENU].push(items.DESCRIP_MENU);
      groups[items.DESCRIP_MENU].push(items.DESCRIP_SUBMENU);
    });
    data.forEach((element) => {
      console.log(element.NOMBRE_SUBMENU);
    });

    for (const group in groups) {
      // console.log(group);
      // console.log(groups[group]);
      groups[group].forEach((submenu) => {
        // console.log(submenu);
      });
    }

    // const items = Object.keys(groups).map((key) => ({
    //   title: key,
    //   items: groups[key],
    // }));

    //console.log(items)
    //return groups;
    // setMenuItems(Object.keys(groups));
    // setMenuItems(items);
  } catch (error) {
    console.error(error);
  }
};
//  API(token);
