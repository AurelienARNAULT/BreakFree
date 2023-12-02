using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallJump : MonoBehaviour
{
    // Start is called before the first frame update

    private bool lookedAt = false;

    void Start()
    {
        
    }

    public void setLookAt(bool looked)
    {
        lookedAt = looked;
    }

    // Update is called once per frame
    void Update()
    {
        //TODO: if lookedAt, make the ball change color and jump by setting the transition condition to true for the animator, otherwise the opposite

    }
}
