import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
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
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow
    } = useTable({
        columns,
        data
    }, useSortBy, usePagination)

    
    // console.log(userList)

    const removeRow = (row) => {
    //     let DATA = data
    //     console.log(DATA[row.index])
    //     DATA.splice(row.index, 1)
    //     setUserList({DATA})
    }

    const cellStyle = {
        paddingTop: "0",
        paddingBottom: "0",
        paddingInline: "0.5rem"
    }
    return (
        <Flex flexDir="column">
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
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <Td {...cell.getCellProps()} sx={cellStyle} > {cell.render('Cell')} </Td>
                                    ))}
                                    <Td sx={cellStyle}>
                                        <Flex gap="0.2rem" mt="0.2rem">
                                            <Button paddingInline="2.2rem">Open</Button>
                                            <Button onClick={ removeRow(row) } paddingInline="1.5rem">Delete</Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
            
        </TableContainer>
        <Flex justify="center" p="1rem" gap="1rem">
            <Button onClick={() => previousPage() } disabled={!canNextPage}> Previous </Button>
            <Button onClick={() => nextPage() } disabled={!canPreviousPage}> Next </Button>
        </Flex>
        </Flex>

        
    )
}

export default MainTable