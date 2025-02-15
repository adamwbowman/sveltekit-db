
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || '❌❌❌ An error occurred');
    }
    return data;
};

const createResourceAPI = (resource) => ({
    fetch: async () => {
        try {
            const response = await fetch(`/api/${resource}`);
            return handleResponse(response);
        } catch (error) {
            console.error(`❌ Error fetching ${resource}:`, error);
            throw error;
        }
    },

    add: async (data) => {
        try {
            const response = await fetch(`/api/${resource}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error(`❌ Error adding ${resource}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`/api/${resource}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            return handleResponse(response);
        } catch (error) {
            console.error(`❌ Error deleting ${resource}:`, error);
            throw error;
        }
    }
});

// Create specific APIs for different resources
export const transactionsAPI = createResourceAPI('transactions');
export const usersAPI = createResourceAPI('users');
// Add more resources as needed