export const getInitials = (nombre:string):string =>{
    const names = nombre.split(" ");
    let initials = "";
  switch (names?.length) {
    case 1:
      initials = names[0].charAt(0);
      break; 
    case 2:
      initials = names[0].charAt(0) + names[1].charAt(0); 
      break; 
    case 3:
      initials = names[0].charAt(0) + names[2].charAt(0); 
      break; 
    case 4:
      initials = names[0].charAt(0) + names[2].charAt(0); 
      break; 
  }
  return initials
}