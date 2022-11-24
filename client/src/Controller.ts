import axios from 'axios';
import { Unit } from './components/App';

export async function saveUnit(unit: Unit): Promise<void> {
  try {
    await axios.post('http://localhost:8080/api/insert', unit);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteUnit(id: number): Promise<void> {
  try {
    await axios.delete(`http://localhost:8080/api/del/${id}`);
  } catch (e) {
    console.log(e);
  }
}

export async function getAllUnits(): Promise<Unit[]> {
  try {
    const response = await axios.get<Unit[]>('http://localhost:8080/api/getAll');
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
