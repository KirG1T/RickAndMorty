import axios from 'axios';

export const getCharacters = async (page: string, name: string) => {
    const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}${
            name ? `&name=${name}` : ''
        }`
    );
    return response;
};

export const getSelectedCharacter = async (id: string) => {
    const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
    );
    return response;
};
