import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import axios from 'axios'
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Button,
    Icon
} from '@chakra-ui/react'

import { COLUMNS } from './columns'

const MainTable = () => {

let ren = 0;

    useEffect(() => {
        getData();
        
    }, [])

    const [userList, setUserList] = useState([])


    const getData = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUserList(response.data)
    }

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => userList, [])


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    }, useSortBy)

    
    // console.log(userList)

    const cellStyle = {
        paddingTop: "0",
        paddingBottom: "0",
        paddingInline: "0.5rem"
    }
    return (
        <TableContainer>
            <Table {...getTableProps()} fontSize="sm">
                <Thead>
                    {
                       headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <Th flexDir="row" p="0.5rem" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                        
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? <ChevronDownIcon w="1rem" h="1rem" color="red.500"/> : <ChevronUpIcon w="1rem" h="1rem" color="red.500"/> ): ""}
                                                </span>
                                            

                                        </Th>
                                    ))
                                }
                                <Th padding="0.5rem" textAlign="center">Actions</Th>

                            </Tr>
                        ))
                    }
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <Td {...cell.getCellProps()} sx={cellStyle} > {cell.render('Cell')} </Td>
                                    ))}
                                    <Td sx={cellStyle}>
                                        <Flex gap="0.2rem" mt="0.2rem">
                                            <Button paddingInline="2.2rem">Open</Button>
                                            <Button paddingInline="1.5rem">Delete</Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default MainTable