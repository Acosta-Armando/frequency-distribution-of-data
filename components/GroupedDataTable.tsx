import React, { FC } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Title from './common/Title'
import { GroupedDataFrequency } from '@/interface'

interface GroupedDataTableProps {
  tableData: GroupedDataFrequency[]
}

const GroupedDataTable: FC<GroupedDataTableProps> = ({ tableData }) => {
  const totalf = tableData.reduce((acc, data) => acc + data.f, 0)
  const totalh = tableData.reduce((acc, data) => acc + data.h!, 0).toFixed(2)
  const totalp = tableData.reduce((acc, data) => acc + data.p!, 0)
  const tableHead = ['n', 'Li - Ls', 'Xi - Xs', 'f', 'F', 'h', 'p', 'H', 'P']

  return (
    <section className='w-full flex flex-col gap-2 overflow-x-auto'>
      <Title title='Frequency Table' />
      <Paper className='w-full overflow-x-auto'>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              {tableHead.map((head, idx) => (
                <TableCell
                  key={idx}
                  align='center'
                  className={`${[1, 2].includes(idx) ? 'min-w-28' : 'min-w-fit'}`}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, idx) => {
              const { LiLs, XiXs, f, F, h, p, H, P } = data
              return (
                <TableRow className='cursor-pointer' key={idx} hover>
                  <TableCell align='center'>{idx + 1}</TableCell>
                  <TableCell align='center'>{`${LiLs[0]} - ${LiLs[1]}`}</TableCell>
                  <TableCell align='center'>{`${XiXs[0]} - ${XiXs[1]}`}</TableCell>
                  <TableCell align='center'>{f}</TableCell>
                  <TableCell align='center'>{F}</TableCell>
                  <TableCell align='center'>{h}</TableCell>
                  <TableCell align='center'>{p}%</TableCell>
                  <TableCell align='center'>{H}</TableCell>
                  <TableCell align='center'>{P}%</TableCell>
                </TableRow>
              )
            })}
            <TableRow className='cursor-pointer' hover>
              <TableCell align='center'>∑</TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'>pts</TableCell>
              <TableCell align='center'>{totalf} <br /> participantes</TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'>{totalh}</TableCell>
              <TableCell align='center'>{totalp}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </section>
  )
}

export default GroupedDataTable
