
package electricitybilling;

import java.util.Scanner;

/**
 *
 * Pedro Henrique Simoes Marcal 2020300
 * Willian 
 */
public class Electricitybilling {

    public static void main(String[] args) {
 //Creating scanner for transforming value in double;
    //for unit
     Scanner ut = new Scanner(System.in);
    //for days
     Scanner dy = new Scanner(System.in);
     double unit;
     double totalunit;
     double days;
     double totaldays;
     double total;
     double varprice;
     double price;
    
    //User input for calculating the unit rate.
     System.out.println("How many units have you used?");
     unit = ut.nextDouble();
    //Calculating the unit price as 0.20 cents per unit.
     totalunit = unit * 0.20;
    
    //User input for calculating the price per how many days rate.
     System.out.println("How many days have you used?");
     days = dy.nextDouble();
    //Calculating the total days price as 0.04 per day.
     totaldays = days * 0.04;

    //Summing up total of units price plus total of days price.
    total = totalunit + totaldays;
    //Finding out the price of var.
    varprice = total *0.135;
    //Summing up total price with var price.
    price = total + varprice;

    //Displaying values.
    System.out.println("Here is your price without Var" + ":"+ (total));
    System.out.print("That is your price with Var" + ":" + (price));

    }
    
}
