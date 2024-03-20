import { Request, Response } from 'express'
import Product from './productsModel'

function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const products = [
    {
        name: "Red T-shirt",
        description: "Classic red cotton t-shirt",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Jeans",
        description: "Stylish blue denim jeans",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Hoodie",
        description: "Warm red hoodie for chilly days",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Dress",
        description: "Elegant blue dress for special occasions",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Sneakers",
        description: "Sporty red sneakers for daily wear",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Jacket",
        description: "Trendy blue jacket for outdoor adventures",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Plaid Shirt",
        description: "Classic red plaid shirt for a casual look",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Skirt",
        description: "Flowy blue skirt for a feminine touch",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Sweater",
        description: "Cozy red sweater for cooler days",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Shorts",
        description: "Comfortable blue shorts for summer",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Scarf",
        description: "Soft red scarf to add a pop of color",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Blouse",
        description: "Chic blue blouse for work or play",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Polo Shirt",
        description: "Classic red polo shirt for a timeless look",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Cardigan",
        description: "Versatile blue cardigan for layering",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Crop Top",
        description: "Stylish red crop top for a trendy outfit",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Leggings",
        description: "Comfy blue leggings for workouts or lounging",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Belt",
        description: "Bold red belt to cinch your waist",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Jumpsuit",
        description: "Fashionable blue jumpsuit for a statement look",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Maxi Dress",
        description: "Elegant red maxi dress for special occasions",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Blue Peacoat",
        description: "Classic blue peacoat for a sophisticated style",
        price: getRandomPrice(20, 500),
        colors: ["blue"],
        sizes: ["S", "M", "L"],
        image: ""
    },
    {
        name: "Red Cap",
        description: "Sporty red cap to top off your look",
        price: getRandomPrice(20, 500),
        colors: ["red"],
        sizes: ["S", "M", "L"],
        image: ""
    }
];

const addProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body)

        await product.save()
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

const addProducts = async (req, res) => {
    console.log("test")
    try {
        // Loop through each product in the array
        for (const productData of products) {
            const product = new Product(productData);
            await product.save();
        }

        res.status(200).json({ message: 'Products added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getSpecificProduct = async (req: Request, res: Response) => {
    try {
        const product = (await Product.findOne({ _id: req.params.id })) as any

        if (!product) return res.status(404).json('Product not found')

        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    Product.findByIdAndDelete({ _id: req.params.id })
        .then((product) =>
            res.status(200).json({ message: 'Product deleted successfully', product })
        )
        .catch((err) => res.status(400).json(err))
}

const updateProduct = async (req: Request, res: Response) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, { $set: { $eq: req.body } })
        .then((product) =>
            res.status(200).json({ message: 'Product updated successfully', product })
        )
        .catch((err) => res.status(400).json(err))
}

export default {
    addProduct,
    getAllProducts,
    getSpecificProduct,
    deleteProduct,
    updateProduct,
    addProducts
}