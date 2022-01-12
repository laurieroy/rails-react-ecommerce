json.product do
	json.id @product.id
	json.name @product.name
	json.description @product.description
	json.price number_to_currency(@product.price)
	json.quantity @product.quantity
end