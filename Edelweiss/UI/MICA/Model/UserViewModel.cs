using MICA.Controllers;
using System;
using System.Collections.Generic;


public class UserViewModel {
    public UserViewModel()
    {
        lstUser = new List<CreateUser>();
    }

    public CreateUser User { get; set; }
    public List<CreateUser> lstUser { get; set; }
}

public class UserTestViewModel
{
    public UserTestViewModel()
    {
        lstUser = new List<User>();
        lstCity = new List<City>();
        lstState = new List<State>();
    }

    public User user { get; set; }
    public List<User> lstUser { get; set; }
    public List<City> lstCity { get; set; }
    public List<State> lstState { get; set; }

    //internal List<City> Select(Func<object, SampleDataController.WeatherForecast> p)
    //{
    //    throw new NotImplementedException();
    //}
}