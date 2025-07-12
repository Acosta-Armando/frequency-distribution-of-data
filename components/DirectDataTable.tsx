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
import { DirectDataFrequency } from '@/interface'

interface DirectDataTableProps {
  tableData: DirectDataFrequency[]
}

const DirectDataTable: FC<DirectDataTableProps> = ({ tableData }) => {
  const totalf = tableData.reduce((acc, data) => acc + data.f, 0)
  const totalh = tableData.reduce((acc, data) => acc + data.h!, 0).toFixed(2)
  const totalp = tableData.reduce((acc, data) => acc + data.p!, 0)
  const totalfxX = tableData.reduce((acc, data) => acc + data.fxX!, 0)
  const totalfxminProd2 = tableData.reduce((acc, data) => acc + data.fxminProd2!, 0)
  const tableHead = [
    'n',
    'X',
    'f',
    'F',
    'h',
    'p',
    'H',
    'P',
    'f . X',
    'X - X̅',
    '(X - X̅)²',
    'f (X - X̅)²',
    '',
  ]

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
                  className={`${
                    [9, 10].includes(idx) ? 'min-w-20' : 'min-w-fit'
                  }`}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, idx) => {
              const { X, f, F, h, p, H, P, fxX, XminProd, XminProd2, fxminProd2 } = data
              return (
                <TableRow className='cursor-pointer' key={idx} hover>
                  <TableCell align='center'>{idx + 1}</TableCell>
                  <TableCell align='center'>{X}</TableCell>
                  <TableCell align='center'>{f}</TableCell>
                  <TableCell align='center'>{F}</TableCell>
                  <TableCell align='center'>{h}</TableCell>
                  <TableCell align='center'>{p}%</TableCell>
                  <TableCell align='center'>{H}</TableCell>
                  <TableCell align='center'>{P}%</TableCell>
                  <TableCell align='center'>{fxX}</TableCell>
                  <TableCell align='center'>{XminProd}</TableCell>
                  <TableCell align='center'>{XminProd2}</TableCell>
                  <TableCell align='center'>{fxminProd2}</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              )
            })}
            <TableRow className='cursor-pointer' hover>
              <TableCell align='center'>∑</TableCell>
              <TableCell align='center'>pts</TableCell>
              <TableCell align='center'>{totalf} <br /> participantes</TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'>{totalh}</TableCell>
              <TableCell align='center'>{totalp}%</TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'>{totalfxX} pts x <br /> participantes</TableCell>
              <TableCell align='center'>pts</TableCell>
              <TableCell align='center'>pts²</TableCell>
              <TableCell align='center'>participantes <br />x pts²</TableCell>
              <TableCell align='center'>{totalfxminProd2}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </section>
  )
}

export default DirectDataTable
