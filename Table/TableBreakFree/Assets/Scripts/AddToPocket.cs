using UnityEngine;
using Lean.Touch;

public class AddToPocket : MonoBehaviour
{
    private bool isTouching = false;
    private bool isPocketShowing = true;
    private float touchDuration = 0f;

    public GameObject pocketIconPrefab;
    private GameObject pocketIconInstance;


    private void Update()
    {
        if (isTouching)
        {
            Debug.Log("IsTouching");
            touchDuration += Time.deltaTime;

            if (touchDuration >= 3f)
            {
                ShowPocketIcon();
            }
        }
    }

    private void OnEnable()
    {
        LeanTouch.OnFingerDown += OnFingerDown;
        LeanTouch.OnFingerUp += OnFingerUp;

        pocketIconInstance = Instantiate(pocketIconPrefab);

        Vector3 objectPosition = transform.position;

        pocketIconInstance.transform.position = new Vector3(objectPosition.x + 10f, objectPosition.y, objectPosition.z);

        pocketIconInstance.SetActive(false);
    }

    private void OnDisable()
    {
        LeanTouch.OnFingerDown -= OnFingerDown;
        LeanTouch.OnFingerUp -= OnFingerUp;

        if (pocketIconInstance != null)
        {
            Destroy(pocketIconInstance);
        }
    }

    private void OnFingerDown(LeanFinger finger)
    {
        Debug.Log("OnFingerDown");
        if (finger.IsOverGui)
        {
            Debug.Log("You just tapped the screen on top of the object!");
            isTouching = true;
        }
        else
        {
            if (isPocketShowing)
            {
                HidePocketIcon();
            }
        }
    }

    private void OnFingerUp(LeanFinger finger)
    {
        Debug.Log("OnFingerUp");
        isTouching = false;
        touchDuration = 0f;
    }

    private void ShowPocketIcon()
    {
        if (pocketIconInstance != null)
        {
            pocketIconInstance.SetActive(true);
            isPocketShowing = true;
        }
    }

    private void HidePocketIcon()
    {
        if (pocketIconInstance != null)
        {
            pocketIconInstance.SetActive(false);
            isPocketShowing = false;
        }
    }

}
