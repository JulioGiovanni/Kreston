import React from 'react'

const ShowUsersTable = () => {
  return (
    <div>ShowUsersTable</div>
  )
}

export default ShowUsersTable
// import React, { useState } from 'react';
// import {
//   createStyles,
//   Table,
//   ScrollArea,
//   UnstyledButton,
//   Group,
//   Text,
//   Center,
//   TextInput,
//   Checkbox,
// } from '@mantine/core';
// import { Selector, ChevronDown, ChevronUp, Search, Edit } from 'tabler-icons-react';
// import EditUser from './EditUser';
// import { useForm, useListState } from '@mantine/hooks';
// import { API } from '../../API';

// const useStyles = createStyles((theme) => ({
//   th: {
//     padding: '0 !important',
//   },

//   control: {
//     width: '100%',
//     padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//     },
//   },

//   icon: {
//     width: 21,
//     height: 21,
//     borderRadius: 21,
//   },
// }));

// interface RowData {
//   id:number;
//   nombre: string;
//   correo: string;
//   rol: string;
//   area: string;
//   oficina: string;
//   activo: boolean;
// }

// interface TableSortProps {
//     data: RowData[];
//     opened: boolean;
//     setOpened: (o:boolean) => void;
//     EditIcon: any;
//     onCancel: any;
//     EyeIcon:any;
// }

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   onSort(): void;
// }

// function Th({ children, reversed, sorted, onSort }: ThProps) {
//   const { classes } = useStyles();
//   const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
//   return (
//     <th className={classes.th}>
//       <UnstyledButton onClick={onSort} className={classes.control}>
//         <Group position="apart">
//           <Text weight={500} size="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon size={14} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </th>
//   );
// }

// function filterData(data: RowData[], search: string) {
//   const keys = Object.keys(data[0]);
//   const query = search.toLowerCase().trim();
//   return data.filter((item:any) => keys.some((key:any) => item[key].toLowerCase().includes(query)));
// }

// function sortData(
//   data: RowData[],
//   payload: { sortBy: keyof RowData; reversed: boolean; search: string }
// ) {
//   if (!payload.sortBy) {
//     return filterData(data, payload.search);
//   }

//   return filterData(
//     [...data].sort((a, b) => {
//       if (payload.reversed) {
//         return b[payload.sortBy].localeCompare(a[payload.sortBy]);
//       }

//       return a[payload.sortBy].localeCompare(b[payload.sortBy]);
//     }),
//     payload.search
//   );
// }

// export function ShowUsersTable({ data,EditIcon,onCancel,EyeIcon,opened,setOpened }: TableSortProps) {
//   const [values, handlers] = useListState(data);
//   const [search, setSearch] = useState('');
//   const [sortedData, setSortedData] = useState(data);
//   const [sortBy, setSortBy] = useState<keyof RowData>(null);
//   const [reverseSortDirection, setReverseSortDirection] = useState(false);



//   const initialValues = {
//     name:'',
//     email:'',
//   }

//   const form = useForm({
//       initialValues,
//       validationRules: {
//         name: (value) => value.trim().length > 2,
//         email: (value) => value.trim().length > 2,
//       },
//     });


//   const setSorting = (field: keyof RowData) => {
//     const reversed = field === sortBy ? !reverseSortDirection : false;
//     setReverseSortDirection(reversed);
//     setSortBy(field);
//     setSortedData(sortData(data, { sortBy: field, reversed, search }));
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.currentTarget;
//     setSearch(value);
//     setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
//   };

//   const rows = values.map((row,index) => {
    
//     return(

//       <tr key={row.correo}>
//         <td>{row.nombre}</td>
//         <td>{row.correo}</td>
//         <td>{row.rol}</td>
//         <td>{row.oficina}</td>
//         <td>{row.area}</td>
//         <td>
//           <Checkbox checked={row.activo} onChange={ (event) => {
//               handlers.setItemProp(index, 'activo', event.currentTarget.checked)
//               row.activo ? API.UserApi.deleteUser(row.id) : API.UserApi.reactiveUser(row.id)
//               }} 
//             />
//           </td>
//         <td>
//         {/* <EditUser
//               EditIcon={EditIcon}
//               onCancel={onCancel}
//               EyeIcon={EyeIcon}
//               opened={opened}
//               setOpened={setOpened}
//               form={form}
//               user={row}
//           /> */}
//         </td>
//       </tr>
//     )
//   });

//   return (
//     <ScrollArea>
//       <TextInput
//         placeholder="Buscar por cualquier campo"
//         mb="md"
//         icon={<Search size={14} />}
//         value={search}
//         onChange={handleSearchChange}
//       />
//       <Table
//         horizontalSpacing="md"
//         verticalSpacing="xs"
//         sx={{ tableLayout: 'fixed', minWidth: 700 }}
//       >
//         <thead>
//           <tr>
//             <Th
//               sorted={sortBy === 'nombre'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('nombre')}
//             >
//               Nombre
//             </Th>
//             <Th
//               sorted={sortBy === 'correo'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('correo')}
//             >
//               Correo
//             </Th>
//             <Th
//               sorted={sortBy === 'rol'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('rol')}
//             >
//               Rol
//             </Th>
//             <Th
//               sorted={sortBy === 'oficina'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('oficina')}
//             >
//               Oficina
//             </Th>
//             <Th
//               sorted={sortBy === 'area'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('area')}
//             >
//               Area
//             </Th>
//             <th>
//                 Activo
//             </th>
//             <th>
//                 Acciones
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length > 0 ? (
//             rows
//           ) : (
//             <tr>
//               <td colSpan={Object.keys(data[0]).length}>
//                 <Text weight={500} align="center">
//                   Nothing found
//                 </Text>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </ScrollArea>
//   );
// }