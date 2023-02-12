import hashlib
import os
import pickle


class Database:
    '''
    This class stores and retrieves information from the database
    '''
    def __init__(self):

        self.registered_user = []
        self.user_activity = {}

    def __check_if_user_exist(self, user_id):
        '''
        Check if the user already Exist
        '''
        print(self.registered_user)
        for user in self.registered_user:
            if user_id == user["user_id"]:
                print('match')
                return True
        
        return False
    
    def __check_password(self, user_id, password):
        '''
        Checks if the password for the user is correct
        '''
        for user in self.registered_user:
            if user_id == user["user_id"]:
                if hashlib.md5(password.encode()).hexdigest() == user["password"]:
                    return True
        
        return False
    
    def __user_details(self, user_id):
        '''
        Get User Details
        '''
        for user in self.registered_user:
            if user_id == user["user_id"]:
                overall_detect = 0
                overall_median = 0
                li = list(self.user_activity.values())
                
                if len(li) != 0:
                    li.sort()
                    overall_detect = sum(li)
                    mid = len(li) // 2
                    overall_median = (li[mid] + li[~mid]) / 2

                data = {
                    "user_id": user["user_id"],
                    "user_name": user["user_name"],
                    "overall_detect": overall_detect,
                    "overall_median": overall_median
                }

                if user_id in self.user_activity:
                    data["detect_count"] = self.user_activity[user["user_id"]]
                else:
                    data["detect_count"] = 0
                return data

    def register(self, user_id, user_name, password):
        '''
        Register the User to the database
        '''
        if self.__check_if_user_exist(user_id):
            return 'Failed'
        
        elif user_id == '':
            return 'Failed'
        
        else:
            user_details = {
                "user_id": user_id,
                "user_name": user_name,
                "password": hashlib.md5(password.encode()).hexdigest()
            }
            self.registered_user.append(user_details)
            return 'Success'

    def signin(self, user_id, password):
        '''
        This function confirm if the user can signin or not
        '''
        if self.__check_if_user_exist(user_id):
            if self.__check_password(user_id, password):
                return 'Success'
        return 'Failed'
    
    def get_user_details(self, user_id):
        '''
        Get the User Details for the given User ID
        '''
        if self.__check_if_user_exist(user_id):
            return self.__user_details(user_id)

        return None

    def update_user_activity(self, user_id):
        '''
        Update the User Detects
        '''
        if self.__check_if_user_exist(user_id):
            if user_id in self.user_activity.keys():
                self.user_activity[user_id] = self.user_activity[user_id] + 1
            
            else:
                self.user_activity[user_id] = 1
        
            return "Success"
        
        return "Failed"


# test the functions
if __name__ == "__main__":
    print(__name__)

    database = Database()
    pkl_file = 'database.pkl'

    if os.path.isfile(pkl_file):
        with open(pkl_file, 'rb') as inp:
            try:
                database = pickle.load(inp)
            except Exception:
                pass
    
    print(database.registered_user, database.user_activity)

    #Check for correct user name & correct password
    ack = database.signin('user', 'user')
    print('Signin Proper: ', ack)

    '''
    #Register New User
    ack = database.register('jack_1', 'Jackie Chan', 'password')
    print('Register New User: ', ack)

    #Re-Register Same User
    ack = database.register('jack_1', 'Jackie Chan', 'password')
    print('Register Existing User: ', ack)

    #Register New User
    ack = database.register('jack_2', 'Jackie Chan', 'password')
    print('Register New User: ', ack)

    #Check for wrong user name
    ack = database.signin('jack', 'password')
    print('Signin wrong user_id: ', ack)

    #Check for correct user name & wrong password
    ack = database.signin('jack_1', 'password1')
    print('Signin wrong password: ', ack)

    #Check for correct user name & correct password
    ack = database.signin('jack_1', 'password')
    print('Signin Proper: ', ack)

    #Get User Details for wrong User ID
    ack = database.get_user_details('jack')
    print('Invalid User ID Details: ', ack)

    #Get User Details forCorrect User ID
    ack = database.get_user_details('jack_1')
    print('Valid User ID Details: ', ack)

    # Update User activity for wrong user
    ack = database.update_user_activity('jack')
    print('Invalid User Activity Update: ', ack)

    # Update User activity for correct user
    ack = database.update_user_activity('jack_1')
    print('Valid User Activity Update: ', ack)
    '''
    

