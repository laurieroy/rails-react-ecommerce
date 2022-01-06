class ProductsController < ApplicationController
	before_action :set_product, except: %i[index new create]
	before_action :require_signin, except: %i[index show]

	def index
		@products = Product.all
	end

	def show
	end

	def new 
		@product = Product.new
	end

	def create
		@product = Product.new(product_params)

		if @product.save
			flash[:notice] = "Product has been saved"
			redirect_to root_path
		else
			flash.now[:alert] = "Product has not been saved"
			render :new
		end
	end

	def edit
	end

	def update
		if @product.update(product_params)
			flash[:notice] = "Product has been updated"
			redirect_to root_path
		else
			flash.now[:alert] = "Product has not been updated"
			render :edit
		end
	end

	def destroy
		@product.destroy
		redirect_to root_path
	end

	private

	def product_params
		params.require(:product).permit(
			:name, :price, :description, :image_url, :quantity
		)
	end

	def set_product
		begin
			@product = Product.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			redirect_to root_path
		end
	end
end
