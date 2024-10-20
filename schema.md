# requirements

1.user can creat an accoutn through referral code
2.user cna login the portal
3.master data for the product catagory sub catagory
4.user can upload the products
5.use can manage his inventory by himself
6.user cna see the products in the portal
7.user can search a product in the portal
8.admin can see the products in the portal
9.admin can block any product in the portal
10 create a sub product and products things

# userSchema
fullName: 
phoneNumber: 
countryCode: 
email:
city:
zip:
address:
password:

# adminSchema
fullName
email
phoneNumber
countryCode
password
role admin / sub-admin
createdBy:null /string the id of the admin for the subadim role
referralcode | null / string; 


#  productsSchema
productId=uniqueId string,
productName:
categoryName:
categoryId: 
subcaregoryName:
subcategoryId:
images: [string] ,
city: 
zip:
address:
createdBy: userId 
status: 'ACTIVE' | 'DELETED' | BLOCKED 
inventoryDetilas:  "AVAILABLE" | "SOLD" | "UNLIST" 


#  referredUsersSchema
referralcode:
userId:
referredBy:adminId

# categorisSchema
caregoryId:
name:
icon:

# subCargeroeisSchema
subCaregoryId:
name:
icon:

# audit logsschema
blocked this product:
unblock this product:

# utils
FTP file ternsfer
HOSTING in the cpanel
EMAIL services?

