class Api::V1::ProductsController < ApplicationController
	before_action :set_product, except: %i[index new create]
	before_action :require_signin, except: %i[index show]
	before_action :require_owner, only: %i[edit update destroy]

	def index
		@products = Product.all
	end

	def show
		@comment = @product.comments.build
		@comments = @product.comments
	end

	def create
		@product = Product.new(product_params)
		@product.user = current_user

		unless @product.save
			render json: @product.errors.full_messages, status: :unprocessable_entity

		end
	end

	def update
		unless @product.update(product_params)
			render json: @product.errors.full_messages, status: :unprocessable_entity
		end
	end

	def destroy
		@product.destroy
	end

	private

	def product_params
		params.require(:product).permit(
			:name, :price, :description, :image_url, :quantity
		)
	end

	def require_owner
		unless @product.owned_by?(current_user)
			render json: { error: "Access denied!"}, status: :unauthorized
		end
	end

	def set_product
		begin
			@product = Product.find(params[:id])
		rescue ActiveRecord::RecordNotFound
			render json: {
				error: "The product you are looking for is not available"
			}, status: 404
		end
	end
end
