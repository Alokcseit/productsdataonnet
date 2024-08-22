import { productsonnet } from "../models/products.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/cloudinary.service.js";
const getProducts=asyncHandler(async(req,res,next)=>{

    try {
        const productsList = await productsonnet.find({});
        if (!productsList) {
            throw new ApiError("No products found", 404);
        }
        return res.status(200).json(new ApiResponse(200, productsList, "Products retrieved successfully"));
    } catch (error) {
        console.log(error);
        return next(error);
    }

})


const getProductByProductId = asyncHandler(async (req, res, next) => {
    try {
        const { productId } = req.params;  // Assuming the productId is passed as a URL parameter
        console.log("Received productId:", productId);
        // Find the product by productId
        const existingProduct = await productsonnet.findOne({ productId });
        
        if (!existingProduct) {
            throw new ApiError("Product not found", 404);
        }

        // Find the product by its MongoDB _id and project specific fields
        const product = await productsonnet.findById(existingProduct._id)
            .select('productId title descryption price quantity status'); // Adjust the fields as needed
        
        if (!product) {
            throw new ApiError("Product not found", 404);
        }

        // Return the product
        return res.status(200).json(new ApiResponse(200, product, "Product retrieved successfully"));
    } catch (error) {
        console.log(error);
        return next(error);
    }
});



const setProducts=asyncHandler(async(req,res,next)=>{
    try {
        const {productId,title, descryption, price,quantity, status } = req.body;
        console.log(productId,title, descryption, price,quantity, status )
        console.log(req.files);
    console.log(req.files.image[0]);
    console.log(req.files.image[0].path);
    const imageFile = req.files.image[0].path;
    //check all data are provided or not
    if (!title || !imageFile) {
        throw new ApiError("Title and Image are required", 400);
      }
    // check the product alreadyy exist or not
    const existingproduct = await productsonnet.findOne({ productId });
    if (existingproduct) {
        throw new ApiError("Product already exists", 400);
    }
    console.log(existingproduct);

    // upload image to cloudinary
    const imageResponse = await uploadFile(imageFile);
    const imageUrl = imageResponse.secure_url;
    console.log(imageUrl);
    // check image uploaded or not
    if (!imageUrl) {
        throw new ApiError("Image upload failed", 400);
    }
    // create product
    const productonnet = await productsonnet.create({
        productId,
        title,
        descryption,
        price,
        image: imageUrl,
        quantity,
        status
    });
    console.log(productonnet);
    return res.status(201).json(
        new ApiResponse(200,productonnet, "User registered Successfully")
    )

    } catch (error) {
        console.log(error);
        return next(error);
    }
})

const deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        const { productId } = req.body;

        console.log("Received productId:", productId);

        // Find the product by productId
        const existingProduct = await productsonnet.findOne({ productId });
        
        if (!existingProduct) {
            console.log("Product not found with productId:", productId);
            throw new ApiError("Product not found", 404);
        }

        console.log("Found product:", existingProduct);

        // Delete the product using its MongoDB _id
        await productsonnet.findByIdAndDelete(existingProduct._id);

        return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
    } catch (error) {
        console.log(error);
        return next(error);
    }
});


const updateProduct = asyncHandler(async (req, res, next) => {
    try {
        const { productId } = req.body;
        const { title, description, price, quantity, status } = req.body;

        // Find the product by productId
        const existingProduct = await productsonnet.findOne({ productId });
        
        if (!existingProduct) {
            throw new ApiError("Product not found", 404);
        }

        // Update the product details
        if (title) existingProduct.title = title;
        if (description) existingProduct.description = description;
        if (price) existingProduct.price = price;
        if (quantity) existingProduct.quantity = quantity;
        if (status) existingProduct.status = status;

        // Save the updated product
        const updatedProduct = await existingProduct.save();
        console.log(updatedProduct);
        return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
    } catch (error) {
        console.log(error);
        return next(error);
    }
});




export {getProducts ,setProducts,deleteProduct ,updateProduct,getProductByProductId}