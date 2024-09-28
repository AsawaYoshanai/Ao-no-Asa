const contractAddress = '0xa76b8BA7458EEA65d0c97772Ffba9Ac94fD0960c';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "ModelListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ModelPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "rater",
				"type": "address"
			}
		],
		"name": "ModelRated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_modelId",
				"type": "uint256"
			}
		],
		"name": "purchaseModel",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_modelId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_rating",
				"type": "uint8"
			}
		],
		"name": "rateModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_modelId",
				"type": "uint256"
			}
		],
		"name": "getModelDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "averageRating",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "modelCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "models",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "ratingSum",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "ratingCount",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];  // Add your ABI here

let web3;
let contract;

const displayModels = async () => {
    const modelCount = await contract.methods.modelCount().call();
    const modelsList = document.getElementById('modelsList');
    modelsList.innerHTML = '';  // Clear previous content

    for (let i = 1; i <= modelCount; i++) {
        const model = await contract.methods.models(i).call();
        const modelElement = document.createElement('div');
        modelElement.innerHTML = `
            <h3>${model.name}</h3>
            <p>${model.description}</p>
            <p>Price: ${model.price} wei</p>
            <button onclick="purchaseModel(${i}, ${model.price})">Purchase</button>
        `;
        modelsList.appendChild(modelElement);
    }
};

const purchaseModel = async (modelId, price) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.purchaseModel(modelId).send({
        from: accounts[0],
        value: price
    });
    alert('Model Purchased!');
};

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert("MetaMask not found!");
        return;
    }

    // Initialize the contract
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Display models on page load
    displayModels();

    // List AI model event
    document.getElementById("listModelForm").onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById("modelName").value;
        const description = document.getElementById("modelDescription").value;
        const price = document.getElementById("modelPrice").value;
        const accounts = await web3.eth.getAccounts();

        await contract.methods.listModel(name, description, price).send({ from: accounts[0] });
        alert("Model Listed!");
        displayModels();  // Refresh the list after adding a new model
    };

    // Withdraw funds
    document.getElementById("withdrawButton").onclick = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.withdrawFunds().send({ from: accounts[0] });
        alert("Funds withdrawn!");
    };
};

document.getElementById("rateModelForm").onsubmit = async (e) => {
    e.preventDefault();
    const modelId = document.getElementById("modelIdRate").value;
    const rating = document.getElementById("modelRating").value;
    const accounts = await web3.eth.getAccounts();

    await contract.methods.rateModel(modelId, rating).send({ from: accounts[0] });
    alert("Model Rated!");
};