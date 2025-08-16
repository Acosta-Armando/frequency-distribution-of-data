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
import { GroupedDataFrequency } from '@/interface'

/**
 * Props for the GroupedDataTable component.
 * @interface GroupedDataTableProps
 * @property {GroupedDataFrequency[]} tableData - An array of objects containing the grouped frequency data.
 */
interface GroupedDataTableProps {
  tableData: GroupedDataFrequency[]
}

/**
 * GroupedDataTable component displays a frequency distribution table for grouped data.
 * It calculates and presents various statistical measures like total frequency,
 * relative frequency, percentage, and components for deviation, specifically for grouped intervals.
 *
 * @param {GroupedDataTableProps} { tableData } - The data to populate the table.
 */
const GroupedDataTable: FC<GroupedDataTableProps> = ({ tableData }) => {
  const totalf = tableData.reduce((acc, data) => acc + data.f, 0)
  const totalh = tableData.reduce((acc, data) => acc + data.h!, 0).toFixed(2)
  const totalp = tableData.reduce((acc, data) => acc + data.p!, 0)
  const totalfxXm = tableData.reduce((acc, data) => acc + data.fxXm!, 0)
  const totalfXmminProd2 = tableData.reduce((acc, data) => acc + data.fXmminProd2!, 0)
  const tableHead = [
    'n',
    'Li - Ls',
    'Xi - Xs',
    'f',
    'F',
    'h',
    'p',
    'H',
    'P',
    'Xm',
    'f . Xm',
    'Xm - X̅',
    '(Xm - X̅)²',
    'f (X - X̅)²',
    ''
  ]
  const tableFooter = [
    '∑',
    '',
    'pts',
    <>{totalf} <br /> participantes</>,
    '',
    totalh,
    `${totalp}%`,
    '',
    '',
    '',
    <>{totalfxXm} pts x <br /> participantes</>,
    'pts',
    'pts²',
    <>participantes <br />x pts²</>,
    totalfXmminProd2
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
                    [1, 2].includes(idx) ? 'min-w-28' : 'min-w-fit'
                  }`}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, idx) => {
              const { LiLs, XiXs, f, F, h, p, H, P, Xm, fxXm, XmminProd, XmminProd2, fXmminProd2 } = data
              const dataKey = [
                idx + 1, `${LiLs[0]} - ${LiLs[1]}`, `${XiXs[0]} - ${XiXs[1]}`, f, F, h, `${p}%`, H, `${P}%`, Xm, fxXm, XmminProd, XmminProd2, fXmminProd2, ''
              ]
              return (
                <TableRow className='cursor-pointer' key={idx} hover>
                  {dataKey.map((data, idx2) => (
                    <TableCell align='center' key={idx2}>{data}</TableCell>
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

export default GroupedDataTable
