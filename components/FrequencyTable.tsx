import React, { FC } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { NumberFrequency } from './Main'
import Title from './common/Title'

interface FrequencyTableProps {
  tableHead: string[]
  tableData: NumberFrequency[]
}

const FrequencyTable: FC<FrequencyTableProps> = ({ tableHead, tableData }) => {
  const totalf = tableData.reduce((acc, data) => acc + data.f, 0);
  const totalh = tableData.reduce((acc, data) => acc + data.h!, 0);
  const totalp = tableData.reduce((acc, data) => acc + data.p!, 0);
  const totalfxX = tableData.reduce((acc, data) => acc + data.fxX!, 0);
  const totlafxminProd2 = tableData.reduce((acc, data) => acc + data.fxminProd2!, 0);
  
  return (
    <section className='w-full flex flex-col gap-2 overflow-x-auto'>
      <Title title='Frequency Table'/>
      <Paper className='w-full overflow-x-auto'>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              {tableHead.map((head, idx) => (
                <TableCell key={idx} align='center'>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, idx) => {
              const { X, f, F, h, p, H, P, fxX, XminProd, XminProd2, fxminProd2 } = data
              return (
                <TableRow className='cursor-pointer' key={idx} hover>
                  <TableCell align="center">{idx + 1}</TableCell>
                  <TableCell align="center">{X}</TableCell>
                  <TableCell align="center">{f}</TableCell>
                  <TableCell align="center">{F}</TableCell>
                  <TableCell align="center">{h}</TableCell>
                  <TableCell align="center">{p}%</TableCell>
                  <TableCell align="center">{H}</TableCell>
                  <TableCell align="center">{P}%</TableCell>
                  <TableCell align="center">{fxX}</TableCell>
                  <TableCell align="center">{XminProd}</TableCell>
                  <TableCell align="center">{XminProd2}</TableCell>
                  <TableCell align="center">{fxminProd2}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              )
            })}
            <TableRow className='cursor-pointer' hover>
              <TableCell align="center">∑</TableCell>
              <TableCell align="center">pts</TableCell>
              <TableCell align="center">{totalf} <br/> participantes</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{totalh}</TableCell>
              <TableCell align="center">{totalp}%</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{totalfxX} pts x <br/> participantes</TableCell>
              <TableCell align="center">pts</TableCell>
              <TableCell align="center">pts²</TableCell>
              <TableCell align="center">participantes <br/>x pts²</TableCell>
              <TableCell align="center">{totlafxminProd2}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Paper>
    </section>
  )
}

export default FrequencyTable
