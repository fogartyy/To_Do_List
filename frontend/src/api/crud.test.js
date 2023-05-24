import axios from 'axios';
import {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo
} from "./crud"

const API_URL = "http://localhost:8080";

 
// Mock axios module
jest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createTodo sends POST request with data', async () => {
    const mockData = { title: 'New Todo', completed: false };
    const mockResponse = { status: 201, data: { id: 1, ...mockData } };
    
    axios.post.mockResolvedValueOnce(mockResponse);

    const response = await createTodo(mockData);

    expect(axios.post).toHaveBeenCalledWith(`${API_URL}/todos`, mockData);
    expect(response).toEqual(mockResponse);
  });

  test('readTodos sends GET request', async () => {
    const mockResponse = { status: 200, data: [{ id: 1, title: 'Todo 1' }, { id: 2, title: 'Todo 2' }] };
    
    axios.get.mockResolvedValueOnce(mockResponse);

    const response = await readTodos();

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/todos`);
    expect(response).toEqual(mockResponse.data);
  });

  test('updateTodo sends PUT request with id and data', async () => {
    const id = 1;
    const mockData = { title: 'Updated Todo', completed: true };
    const mockResponse = { status: 200, data: { id, ...mockData } };
    
    axios.put.mockResolvedValueOnce(mockResponse);

    const response = await updateTodo(id, mockData);

    expect(axios.put).toHaveBeenCalledWith(`${API_URL}/todos/${id}`, mockData);
    expect(response).toEqual(mockResponse);
  });

  test('deleteTodo sends DELETE request with id', async () => {
    const id = 1;
    const mockResponse = { status: 204 };
    
    axios.delete.mockResolvedValueOnce(mockResponse);

    const response = await deleteTodo(id);

    expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/todos/${id}`);
    expect(response).toEqual(mockResponse);
  });
});
