class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :authenticate_user!

    protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name, :username])
        devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :username])
        devise_parameter_sanitizer.permit(:sign_in, keys: [:login])
    end
end
