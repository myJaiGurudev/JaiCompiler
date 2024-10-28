'''
Creating the Function.
Take an int value form user.
Keep on Asking , if wrong input is given by user.
'''

def getValidNum(prompt):
    while True:
        try:
            value=int(input(prompt))
            return value
        except ValueError:
            print("Invalid Input ,Enter again")

#Creating the Method for totalCost.

def totalCost(budget,days):
    return budget*days

#Creating the function and take name from user.

def nameUser():
    S=input("Hello User! Please Enter your name : \n").title()
    return S

#Creating the function to take input form user as Destination and Give response to user.

"""
strip is use to remove the space of the destination.
lower is use to convert the destination given by user into lower case.
"""

def destinationFun():
    while True:
        A=input("Hello User! Please select the Destination : \n").strip().lower()
        if A=="mountain":
            return A;
        elif A=="beach":
            return A;
        else:
            print("You have not Selected the correct Destination ! Please select the proper Destination")

name=nameUser()

# title is use to Captilize the 1st letter of name.

message=f"Hello {name}, Welcome to Personalized Adventure Guide Game"

# fstring is use to put the variable in between the String.

print(message)

"""
Take the Destination from user.
Give Response as per user Input
"""

print("Select one of them Mountain or Beach")

#Calling the destinationFub method and take currect destination input from user.

destination=destinationFun()
if destination=="mountain":
    print("You have Select destination as Mountain")
else :
    print("You have Select destination as Beach")
    
"""
Take budget, No.of days -input from user.
if budget:
    >= 500 -> luxury
    200 <= budget <500 ->good
    0 < budget <200 -> budget friendly
"""

budget = getValidNum("Enter your Budget : ") 

#Calling the getValidNum method and take currect budget input from user.

if budget >= 500:
    print("Your trip is Luxuary.")
elif budget >= 200:
    print("Your trip is Good.")
elif budget > 0:
    print("Your trip is Budget friendly.")

"""
Take Days as Input from user. 
Calculate the Budget and Give to user.
"""

days = getValidNum("Enter the Number of Days : ") 

#Calling the getCValidNum method and take the currect number of days form user. 

totalCost = totalCost(budget,days)

#Calling the totalCost method and return to user.

print(f""" Number of Days - {days} \n Your per day Budget - {budget} \n Your TotalCast - {totalCost} \n""")