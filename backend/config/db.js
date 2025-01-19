import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url =
      "mongodb://mahjoobalhaj4:AtnH7JfoynqMNnAd@cluster0-shard-00-00.trdvb.mongodb.net:27017,cluster0-shard-00-01.trdvb.mongodb.net:27017,cluster0-shard-00-02.trdvb.mongodb.net:27017/?ssl=true&replicaSet=atlas-jaxu8r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

// AtnH7JfoynqMNnAd

// mongodb://mahjoobalhaj4:AtnH7JfoynqMNnAd@cluster0-shard-00-00.trdvb.mongodb.net:27017,cluster0-shard-00-01.trdvb.mongodb.net:27017,cluster0-shard-00-02.trdvb.mongodb.net:27017/delivery-app?replicaSet=<replicaSetName>&ssl=true&authSource=admin
