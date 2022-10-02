const db = require("../configs/db.js");
const User = require("../models/User.js");
const UsedCar = require("../models/UsedCar");
const LabelledUsedCar = require("../models/LabelledUsedCar");
const { v4: uuidv4 } = require("uuid");

async function devKickStart() {
  const user = await User.create({
    name: "gowtham",
    email: "test1@gmail.com",
    password: "$2a$10$GJb7rMVuT2KaxfDty8MLQeIit.nvF99AYPTfRAyrZvRDPn88os5AS",
    userId: "9f70c318-ce31-4dbc-9320-f442abfce83c",
    isAccConformed: false,
    accConformToken:
      "bbc2d37238bec2ea49f963657a9d2ddd671b50e17cafc2b9590f28adce508c56",
    accConformTokenExpiry: "2022-09-25T05:56:10.277Z",
    magicLinkToken: null,
    magicLinkTokenExpiry: null,
    forgetPasswordToken: null,
    forgetPasswordExpiry: null,
  });

  const evaluator = await User.create({
    name: "gowtham",
    email: "evaltest1@gmail.com",
    password: "$2a$10$GJb7rMVuT2KaxfDty8MLQeIit.nvF99AYPTfRAyrZvRDPn88os5AS",
    userId: "9f70c318-ce31-4dbc-9320-f442abfce83d",
    isAccConformed: false,
    accConformToken:
      "bbc2d37238bec2ea49f963657a9d2ddd671b50e17cafc2b9590f28adce508c56",
    accConformTokenExpiry: "2022-09-25T05:56:10.277Z",
    magicLinkToken: null,
    magicLinkTokenExpiry: null,
    forgetPasswordToken: null,
    forgetPasswordExpiry: null,
    isEvaluator: true,
  });

  const usedCar = await UsedCar.bulkCreate([
    {
      id: 1,
      carModel: "Hyundai i20",
      location: "Chennai",
      year: "2019",
      kilometers: "91375",
      ownerType: "First",
      fuelType: "Diesel",
      power: "88.76",
      price: "9.38",
      images:
        '[{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705806/uploads/ydkpx2fjajrcn40lec4d.jpg","id":"uploads/ydkpx2fjajrcn40lec4d"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705808/uploads/rsztqjoobpsn97gro4nm.jpg","id":"uploads/rsztqjoobpsn97gro4nm"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705810/uploads/pgvojnqrvg9xjdxomcyj.jpg","id":"uploads/pgvojnqrvg9xjdxomcyj"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705812/uploads/skgjizu0ulfqjylp4wyx.jpg","id":"uploads/skgjizu0ulfqjylp4wyx"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705813/uploads/mre2cmrlghsw78qpb4gg.jpg","id":"uploads/mre2cmrlghsw78qpb4gg"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705816/uploads/zsrlnjukm8ptriygzok3.jpg","id":"uploads/zsrlnjukm8ptriygzok3"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705818/uploads/osnnzqbdnigelxpl1sej.jpg","id":"uploads/osnnzqbdnigelxpl1sej"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705820/uploads/qdnkupcsxfridjdb0ib7.jpg","id":"uploads/qdnkupcsxfridjdb0ib7"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664705822/uploads/wxma3ihwiypwb1ibvdl6.jpg","id":"uploads/wxma3ihwiypwb1ibvdl6"}]',
      videos: null,
      ucId: "719a749d-8168-4721-b624-976f0605e247",
      evaluatedPrice: null,
      predictedPrice: null,
      isEvalFinished: false,
      evalFeedback: null,
    },
    {
      id: 2,
      carModel: "Hyundai EON",
      location: "Hyderabad",
      year: "2012",
      kilometers: "84500",
      ownerType: "First",
      fuelType: "Petrol",
      power: "55.2",
      price: "3.41",
      images:
        '[{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706065/uploads/mqmyclfnrqbqoiqs0tso.jpg","id":"uploads/mqmyclfnrqbqoiqs0tso"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706067/uploads/xasckwdwhs8rtdhl6h9s.jpg","id":"uploads/xasckwdwhs8rtdhl6h9s"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706069/uploads/dreq2qljlpnnj7qyotoz.jpg","id":"uploads/dreq2qljlpnnj7qyotoz"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706071/uploads/v3wbsu396xvdgrnimkz5.jpg","id":"uploads/v3wbsu396xvdgrnimkz5"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706074/uploads/fy8fyhwepzw8quvd3qvr.jpg","id":"uploads/fy8fyhwepzw8quvd3qvr"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706076/uploads/mzvwwrirvyfmjkcuoxns.jpg","id":"uploads/mzvwwrirvyfmjkcuoxns"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706078/uploads/xjwlytjmuyefl4ltdm8o.jpg","id":"uploads/xjwlytjmuyefl4ltdm8o"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706081/uploads/hys4e7m5ywenktpwacle.jpg","id":"uploads/hys4e7m5ywenktpwacle"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664706083/uploads/zrn8wug6kwdlxqgw2gy1.jpg","id":"uploads/zrn8wug6kwdlxqgw2gy1"}]',
      videos: null,
      ucId: "9727453c-b6b7-4142-a4f8-dbd5ba75b1da",
      evaluatedPrice: null,
      predictedPrice: null,
      isEvalFinished: false,
      evalFeedback: null,
    },
    {
      id: 3,
      carModel: "Honda Brio",
      location: "Bangalore",
      year: "2015",
      kilometers: "52913",
      ownerType: "First",
      fuelType: "Petrol",
      power: "86.8",
      price: "6.97",
      images:
        '[{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664707462/uploads/s4owflxclybi4bl9vdfg.webp","id":"uploads/s4owflxclybi4bl9vdfg"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664707464/uploads/dyw7iods4klzzx49u275.webp","id":"uploads/dyw7iods4klzzx49u275"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664707465/uploads/mpisupszk663xdv6kxqf.webp","id":"uploads/mpisupszk663xdv6kxqf"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664707467/uploads/jc1ds4jpmugqzz2pnguv.webp","id":"uploads/jc1ds4jpmugqzz2pnguv"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664707469/uploads/wimmmoeebn4fl9qypmcs.webp","id":"uploads/wimmmoeebn4fl9qypmcs"},{"url":"http://res.cloudinary.com/dy8dcyq13/image/upload/v1664707471/uploads/xzuvwvhqfl84hu2y4prj.webp","id":"uploads/xzuvwvhqfl84hu2y4prj"}]',
      videos: null,
      ucId: "b02203f2-420f-4241-b6ed-1dc030ac90f6",
      evaluatedPrice: null,
      predictedPrice: null,
      isEvalFinished: false,
      evalFeedback: null,
    },
  ]);

  await LabelledUsedCar.bulkCreate([
    {
      id: 1,
      carModel: 43,
      location: 2,
      year: 17,
      kilometers: 91,
      ownerType: 2,
      fuelType: 1,
      power: "88.76",
      price: "9.38",
      ucId: "719a749d-8168-4721-b624-976f0605e247",
      usedCarId: 1,
    },
    {
      id: 2,
      carModel: 33,
      location: 5,
      year: 10,
      kilometers: 84500,
      ownerType: 2,
      fuelType: 2,
      power: "55.2",
      price: "3.41",
      ucId: "9727453c-b6b7-4142-a4f8-dbd5ba75b1da",
      usedCarId: 2,
    },
    {
      id: 3,
      carModel: 25,
      location: 1,
      year: 13,
      kilometers: 52,
      ownerType: 2,
      fuelType: 2,
      power: "86.8",
      price: "6.97",
      ucId: "b02203f2-420f-4241-b6ed-1dc030ac90f6",
      usedCarId: 3,
    },
  ]);
}

module.exports = {
  devKickStart,
};
