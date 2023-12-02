using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallPopulator : MonoBehaviour
{
    public int ballsNum = 36;
    Camera mcamera;
    public GameObject ballPrefab;  // TODO: assign your ball prefab in the Unity Editor

    // TODO (optional): you might want an array to store the balls
    private GameObject[] ballsArray;

    // Start is called before the first frame update
    void Start()
    {
        // TODO: find the main camera
        mcamera = Camera.main;

        // TODO: generate the balls
        ballsArray = new GameObject[ballsNum];
        for (int i = 0; i < ballsNum; i++)
        {
            // this is done for you: sphereholder is just an empty object to hold the ball (to enable local transforms)
            GameObject sphereHolder = new GameObject("SphereHolder");
            sphereHolder.transform.parent = GameObject.Find("Balls").transform;

            // TODO: move the sphereholder to its position on the ring at a radius of 10 meters from the camera
            // hint: Mathf.Sin, Mathf.Cos, and Mathf.PI are useful here
            float angle = i * Mathf.PI * 2 / ballsNum;
            float x = Mathf.Cos(angle) * 10;
            float z = Mathf.Sin(angle) * 10;
            sphereHolder.transform.position = new Vector3(x, 0, z);

            // TODO: create the ball and make sphereHolder its parent, just like we did on Line 24
            // note: if all is well, up to this point when the scene plays, there should be a ring of balls around the camera
            GameObject ball = Instantiate(ballPrefab, sphereHolder.transform);
            ballsArray[i] = ball;

            // TODO: dynamically add an animator component and the BallJump script to the ball
            // hint: use add component
            Animator animator = ball.AddComponent<Animator>();
            BallJump ballJumpScript = ball.AddComponent<BallJump>();

            // TODO: load the "jumpControl" controller from your assets
            // hint: runtimeAnimatorController is useful here
            animator.runtimeAnimatorController = Resources.Load<RuntimeAnimatorController>("jumpControl");
        }
    }

    // Update is called once per frame
    void Update()
    {
        // TODO: detect when the right arrow and left arrow are pressed, and rotate the camera
        float horizontalInput = Input.GetAxis("Horizontal");
        mcamera.transform.Rotate(Vector3.up, horizontalInput * Time.deltaTime * 50f);
    }
}
