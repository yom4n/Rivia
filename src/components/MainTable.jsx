import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    TableContainer, 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex
} from '@chakra-ui/react'

const MainTable = () => {
    const [userList, setUserList] = useState([])
    const getData = async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUserList(response.data)
    }
    useEffect(() => {
        getData();
        console.log(userList)
    },[])
    
    const columns = [ "Name", "Username", "Email", "Address", "Phone", "Website", "Company", "Actions"]
    return (
        <TableContainer>
            <Table >
                <Thead>
                    <Tr>
                        {columns.map((title)=> <Th>{title}</Th> )}
                    </Tr>
                </Thead>
                <Tbody>
                    {userList.map((user)=>(
                        <Tr>
                            <Td> {user.name} </Td>
                            <Td> {user.username} </Td>
                            <Td> {user.email} </Td>
                            <Td> {user.address.city} </Td>
                            <Td> {user.phone} </Td>
                            <Td> {user.website} </Td>
                            <Td> {user.company.name} </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default MainTable