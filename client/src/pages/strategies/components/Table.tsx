// @ts-nocheck
import React from 'react'
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { useHistory } from 'react-router'
import { useAppSelector } from '../../../store/store'
import { IGetStrategyDto } from '@cohdex/shared'

interface ITableData {
  id: number
  slug: string
  title: string
  you: string
  opponent: string
  mapName: string
  visibility: any
  spawn: string
}

interface ITableProps {
  tableData: ITableData[]
}

export const Table: React.FC<ITableProps> = ({ tableData }) => {
  const history = useHistory()
  const status = useAppSelector((state) => state.strategies.status)
  const data = React.useMemo(() => tableData, [tableData])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'You',
        accessor: 'you',
      },
      {
        Header: 'Opponent',
        accessor: 'opponent',
      },
      {
        Header: 'Map',
        accessor: 'mapName',
      },
      {
        Header: 'Spawn',
        accessor: 'spawn',
      },
      {
        Header: 'Visibility',
        accessor: 'visibility',
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  function handleNavigate({ slug, id }: IGetStrategyDto) {
    history.push('/strategy/' + id + `/${slug}`)
  }

  return (
    <Box
      overflowX="auto"
      w="100%"
      display={{
        base: 'none',
        md: 'table',
      }}
    >
      <ChakraTable
        {...getTableProps()}
        bgColor="table"
        color="text.600"
        borderTop="10px solid"
        borderColor="primary.600"
        outline="1px solid"
        outlineColor="border"
        variant="unstyled"
        minWidth="600px"
        style={{
          tableLayout: 'fixed',
        }}
      >
        <Thead bgColor="#1C171E">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {status === 'loading-strategies' && 'Getting your strategies!'}
          {status === 'idle' &&
            rows.map((row) => {
              prepareRow(row)
              return (
                <Tr
                  {...row.getRowProps()}
                  _even={{ background: 'tableStriped' }}
                  cursor="pointer"
                  borderLeft="2px solid"
                  borderColor="transparent"
                  onClick={() =>
                    handleNavigate({
                      slug: row.original.slug,
                      id: row.original.id,
                    })
                  }
                  transition="all .15s ease"
                  _hover={{
                    borderColor: 'primary.600',
                    color: 'text.500',
                  }}
                >
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
        </Tbody>
      </ChakraTable>
    </Box>
  )
}
