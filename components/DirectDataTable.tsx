import React, { FC } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Title from './ui/Title'
import { DirectDataFrequency } from '@/interface'

/**
 * Props for the DirectDataTable component.
 * @interface DirectDataTableProps
 * @property {DirectDataFrequency[]} tableData - An array of objects containing the direct frequency data.
 */
interface DirectDataTableProps {
  tableData: DirectDataFrequency[]
}

/**
 * DirectDataTable component displays a frequency distribution table for direct data.
 * It calculates and presents various statistical measures like total frequency,
 * relative frequency, percentage, and components for deviation.
 *
 * @param {DirectDataTableProps} { tableData } - The data to populate the table.
 */
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
  const tableFooter = [
    '∑',
    'pts',
    <>{totalf} <br /> participantes</>,
    '',
    totalh,
    `${totalp}%`,
    '',
    '',
    <>{totalfxX} pts x <br /> participantes</>,
    'pts',
    'pts²',
    <>participantes <br />x pts²</>,
    totalfxminProd2
  ]

  return (
    <section className='w-full flex flex-col gap-2 overflow-x-auto pb-4'>
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
              const dataKey = [ idx + 1, X, f, F, h, `${p}%`, H, `${P}%`, fxX, XminProd, XminProd2, fxminProd2, '']
              return (
                <TableRow className='cursor-pointer' key={idx} hover>
                  {dataKey.map((key, idx2) => (
                    <TableCell align='center' key={idx2}>{key}</TableCell>
                  ))}
                </TableRow>
              )
            })}
            <TableRow className='cursor-pointer' hover>
              {tableFooter.map((footer, idx) => (
                <TableCell align='center' key={idx}>{footer}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </section>
  )
}

export default DirectDataTable
